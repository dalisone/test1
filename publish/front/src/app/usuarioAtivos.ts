export interface UsuarioAtivos
{
    id: number,
    idUsuario: number,
    nome: string,
    dataNasc: string,
    gerente: number
    usuario: {
        id:number,
        dataNasc: string,
        nome: string
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