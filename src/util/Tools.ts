export class Tools{

    public static toTree(array:any,parentId:string){
        const result=[]
        for (let i=0;i<array.length;i++){
            const c=array[i]
            if (c.parent===parentId){
                result.push(c)
                //递归获取子节点
                c.children=Tools.toTree(array, c.id)
            }
        }
        return result
    }//将数组转换为树形结构

}