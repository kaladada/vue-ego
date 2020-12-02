import axios from '../utils/request'
import base from './base'

const api = {
    // 登录接口
    getLogin(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    //注册接口
    getRegister(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    // 商品查询接口
    getSelectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {
            params
        })
    },
    //商品总条数
    getTotal() {
        return axios.get(base.baseUrl + base.total)
    },
    //模糊查询
    getSearch(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    //类目选择
    selectItemCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId, {
            params
        })
    },
    /**
     * 添加产品
     */
    insertTbItem(params) {
        return axios.get(base.baseUrl + base.insertTbItem, {
            params
        })
    },
    /**
     * 删除产品
     */
    deleteItemById(params) {
        return axios.get(base.baseUrl + base.deleteItemById, {
            params
        })
    },
    /**
     * 预更新
     */
    preUpdateItem(params) {
        return axios.get(base.baseUrl + base.preUpdateItem, {
            params
        })
    },
    /**
     * 修改商品
     */
    updateTbItem(params) {
        return axios.get(base.baseUrl + base.updateTbItem, {
            params
        })
    },
    //规格参数 读取数据
    selectItemParamAll(params) {
        return axios.get(base.baseUrl + base.selectItemParamAll, {
            params
        })
    },

    /**
     * 内容分类管理 导航查询
     */
    selectContentCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectContentCategoryByParentId, {
            params
        })
    },
    /**
     * 内容分类管理 添加导航
     */
    insertContentCategory(params) {
        return axios.get(base.baseUrl + base.insertContentCategory, {
            params
        })
    },
    /**
     * 内容分类管理 修改导航
     */
    updateContentCategory(params) {
        return axios.get(base.baseUrl + base.updateContentCategory, {
            params
        })
    },
    /**
     * 内容分类管理 删除导航
     */
    deleteContentCategoryById(params) {
        return axios.get(base.baseUrl + base.deleteContentCategoryById, {
            params
        })
    },
    /**
     * 内容分类管理 内容添加
     */
    insertTbContent(params) {
        return axios.get(base.baseUrl + base.insertTbContent, {
            params
        })
    },
    /**
     * 内容分类管理 内容查询
     */
    selectTbContentAllByCategoryId(params) {
        return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId, {
            params
        })
    },
    /**
     * 内容分类管理 内容删除
     */
    deleteContentByIds(params) {
        return axios.get(base.baseUrl + base.deleteContentByIds, {
            params
        })
    }


}

export default api;