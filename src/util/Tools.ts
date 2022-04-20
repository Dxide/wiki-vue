export class Tools{

    public static toTree(array:any,parentId:string){
        if (Tools.isEmpty(array)) {
            return [];
        }
        const result=[]
        for (let i=0;i<array.length;i++){
            const c=array[i]
            if (c.parent===parentId){
                result.push(c)
                //递归获取子节点
                const children = Tools.toTree(array, c.id);
                if (!Tools.isEmpty(children)) {
                    c.children = children;
                }
            }
        }
        return result
    }//将数组转换为树形结构

    public static isEmpty (obj: any) {
        if ((typeof obj === 'string')) {
            return !obj || obj.replace(/\s+/g, "") === ""
        } else {
            return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
        }
    }//空校验 null或""都返回true

    public static copy(obj:any){
        return JSON.parse(JSON.stringify(obj))
    }//对象的复制
}