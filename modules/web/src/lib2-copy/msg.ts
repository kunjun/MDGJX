export const OBJ_MSG_TYPE = {
    'updateTitle': 1,
    'openLogDir':1,
    'reportLogToServer':1
}
// get key as type
export type MsgType = keyof typeof OBJ_MSG_TYPE;
export type IpcMainOnTypeFn = (key:MsgType, ...value:any)=>Promise<boolean>
export type MsgRefType = {
    ipcMain_on: IpcMainOnTypeFn,
    ipcRender_send: (key:MsgType,...value:any)=>void
}

export const MSG_REF:MsgRefType = {
    ipcMain_on: function(key:MsgType, value: any){
        throw new Error('ipcMain_on not implemented')
    },
    ipcRender_send: function(key:MsgType,value:any){
        throw new Error('ipcRender_send not implemented')
    } 
}
// you should implement above functions in your main process and renderer process