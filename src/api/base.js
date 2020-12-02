const base={
    baseUrl:'/api',
    login:'/api/login',//登录
    register:'/api/register',//注册
    selectTbItemAllByPage:'/api/backend/item/selectTbItemAllByPage',// 商品查询接口
    total:"/api/total", // 商品总条数
    search:"/api/search", // 商品的模糊查询
    selectItemCategoryByParentId:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    insertTbItem:"/api/backend/item/insertTbItem", // 添加产品 
    deleteItemById:'api/backend/item/deleteItemById',//商品删除
    preUpdateItem:"/api/backend/item/preUpdateItem", // 预更新
    updateTbItem:"/api/backend/item/updateTbItem", // 修改商品
    selectItemParamAll:"/api/backend/itemParam/selectItemParamAll",//规格参数 读取数据

    selectContentCategoryByParentId:"/api/content/selectContentCategoryByParentId", // 内容分类管理 导航查询
    insertContentCategory:"/api/content/insertContentCategory", // 内容分类管理 添加导航
    updateContentCategory:"/api/content/updateContentCategory", // 内容分类管理 修改导航
    deleteContentCategoryById:"/api/content/deleteContentCategoryById", // 内容分类管理 删除导航
    insertTbContent:"/api/content/insertTbContent", // 内容分类管理 内容添加
    selectTbContentAllByCategoryId:"/api/content/selectTbContentAllByCategoryId", // 内容分类管理 内容查询
    deleteContentByIds:"/api/content/deleteContentByIds", // 内容分类管理 内容删除
}

export default base