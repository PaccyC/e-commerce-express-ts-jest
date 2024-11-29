

export const apiResponse = ()=>{
    return {
        success: (status:number,data: any) => ({
            status,
            data
        }),
        error: (error: any) => ({
            status: error.status || 500,
            message: error.message,
            error: error.stack
        })
    }
}