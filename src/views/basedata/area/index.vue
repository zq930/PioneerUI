<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['basedata:area:add']"
        >新增</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="areaList"
      row-key="id"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      lazy
      :load="getChildrens"
    >
      <el-table-column label="名称" prop="name" />
      <el-table-column label="全称" align="center" prop="mergerName" />
      <el-table-column label="层级" align="center" prop="level" >
        <template #default="scope">
          <dict-tag :options="sys_area_level" :value="scope.row.level" />
        </template>
      </el-table-column>
      <el-table-column label="经度" align="center" prop="lng" />
      <el-table-column label="纬度" align="center" prop="lat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" >
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basedata:area:edit']"
          >修改</el-button>
          <el-button
            type="text"
            icon="Plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['basedata:area:add']"
          >新增</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basedata:area:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改地区对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="areaRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="上级地区" prop="pid">
          <tree-select
            v-model:value="form.pid"
            :options="areaOptions"
            :objMap="{ value: 'id', label: 'name', children: 'children' }"
            placeholder="请选择上级地区"
          />
        </el-form-item>
        <el-form-item label="简称" prop="shortname">
          <el-input v-model="form.shortname" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="全称" prop="mergerName">
          <el-input v-model="form.mergerName" placeholder="请输入全称" />
        </el-form-item>
        <el-form-item label="层级" prop="level">
          <el-select v-model="form.level" placeholder="请选择层级">
            <el-option
                v-for="dict in sys_area_level"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拼音" prop="pinyin">
          <el-input v-model="form.pinyin" placeholder="请输入拼音" />
        </el-form-item>
        <el-form-item label="长途区号" prop="code">
          <el-input v-model="form.code" placeholder="请输入长途区号" />
        </el-form-item>
        <el-form-item label="邮编" prop="zipCode">
          <el-input v-model="form.zipCode" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="首字母" prop="first">
          <el-input v-model="form.first" placeholder="请输入首字母" />
        </el-form-item>
        <el-form-item label="经度" prop="lng">
          <el-input v-model="form.lng" placeholder="请输入经度" />
        </el-form-item>
        <el-form-item label="纬度" prop="lat">
          <el-input v-model="form.lat" placeholder="请输入纬度" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Area">
import { listArea, treeListArea, getArea, delArea, addArea, updateArea } from "@/api/basedata/area";

const { proxy } = getCurrentInstance();
const { sys_area_level } = proxy.useDict("sys_area_level");

const areaList = ref([]);
const areaOptions = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const title = ref("");
const isExpandAll = ref(true);
const refreshTable = ref(true);

const getChildrens = (
    row,
    treeNode,
    resolve
) => {
  treeListArea({pid:row.id}).then(response => {
    resolve(response.data)
  });
}

const data = reactive({
  form: {},
  queryParams: {
  },
  rules: {
    pid: [{ required: true, message: "上级地区不能为空", trigger: "blur" }],
    name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
    level: [{ required: true, message: "层级不能为空", trigger: "blur" }],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询地区列表 */
function getList() {
  loading.value = true;
  treeListArea({pid:0}).then(response => {
    areaList.value = response.data;
    loading.value = false;
  });
}

/** 查询地区下拉树结构 */
async function getTreeSelect() {
  await listArea().then(response => {
    areaOptions.value = [];
    const data = { id: 0, name: '顶级节点', children: [] };
    data.children = proxy.handleTree(response.data, "id", "pid");
    areaOptions.value.push(data);
  });

  // let res = await listArea();
  // areaOptions.value = [];
  // const data = { id: 0, name: '顶级节点', children: [] };
  // data.children = proxy.handleTree(res.data, "id", "pid");
  // areaOptions.value.push(data);

}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: undefined,
    pid: undefined,
    shortname: undefined,
    name: undefined,
    mergerName: undefined,
    level: undefined,
    pinyin: undefined,
    code: undefined,
    zipCode: undefined,
    first: undefined,
    lng: undefined,
    lat: undefined
  };
  proxy.resetForm("areaRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 新增按钮操作 */
async function handleAdd(row) {
  reset();
  await getTreeSelect();
  if (row != null && row.id) {
    form.value.pid = row.id;
  } else {
    form.value.pid = 0;
  }
  open.value = true;
  title.value = "添加地区";
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  await getTreeSelect();
  if (row != null) {
    form.value.pid = row.id;
  }
  getArea(row.id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改地区";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["areaRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateArea(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addArea(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm('是否确认删除地区编号为"' + row.id + '"的数据项？').then(function() {
    return delArea(row.id);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

getList();
</script>
