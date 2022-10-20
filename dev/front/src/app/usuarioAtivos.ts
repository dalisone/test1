export interface UsuarioAtivos
{
    id: number,
    usuario: {
        id:number
    },
    ativo: {
        id:number,
        nome:string,
        grupo: {
            id:number,
            nome: string
        }
    },
    saldo: number
}