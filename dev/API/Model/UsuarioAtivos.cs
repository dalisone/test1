using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario_Ativo {

    public int Id {get; set;}
    public Usuario Usuario{get; set;}
    public Ativos Ativo{get; set;}
    public decimal Saldo {get; set;}

    // Funçao para salvar no banco de dados
    public int Save(int UsuarioId, int AtivoId){

        using(var context = new Context()){

            var usuario = context.Usuario.FirstOrDefault(b => b.Id == UsuarioId);
            var ativo = context.Ativos.FirstOrDefault(b => b.Id == AtivoId);
            var obj = new Usuario_Ativo{
                Saldo = this.Saldo,
                Usuario = usuario,
                Ativo = ativo
            };

            context.Usuario_Ativos.Add(obj);
            context.SaveChanges();
            Id = obj.Id;

        }
        return Id;

    }

    // Funçao para trazer todos os ativos que um usuario possui
    public static List<object> FindById(int id){

        using(var context = new Context()){

            var ativo = context.Usuario_Ativos.Where(x => x.Usuario.Id == id).Include(x=> x.Ativo).Include(x=> x.Ativo.Grupo);

            List<object> ativos = new List<object>();

            foreach(var item in ativo){

                ativos.Add(item);

            }
            return ativos;
        }

    }

    // Funcao para retornar ativo especifico do usuario
    public static List<object> FindUserAtivo(int idUsuario, int idAtivo){

        using(var context = new Context()){

            var ativo = context.Usuario_Ativos.Where(x => x.Usuario.Id == idUsuario && x.Ativo.Id == idAtivo).Include(x=> x.Ativo).Include(x=> x.Ativo.Grupo);

            List<object> ativos = new List<object>();

            foreach(var item in ativo){

                ativos.Add(item);

            }
            return ativos;
        }

    }

    // Funcao para retornar todas os usuarios e seus respectivos ativos
    public static List<object> FindAll(){

        using(var context = new Context()){

            var usuarioAtivo = context.Usuario_Ativos.Include(x => x.Ativo).Include(x => x.Usuario).Include(x => x.Ativo.Grupo);

            List<object> usuarioAtivos = new List<object>();

            foreach (var item in usuarioAtivo){
                usuarioAtivos.Add(item);
            }

            return usuarioAtivos;

        }

    }

    // Funcao utilizada para mudar o saldo dos ativos
    public static void MudaSaldo(Usuario_Ativo usuarioAtivo, int id){

        using(var context = new Context()){

            var UsuarioAtivo = context.Usuario_Ativos.FirstOrDefault(x => x.Id == id);

            if(usuarioAtivo != null){
                UsuarioAtivo.Saldo += usuarioAtivo.Saldo;
            }

            context.SaveChanges();

        }

    }

    // Funcao utilizada para deletar um ativo de um usuario especifico do banco
    public static void Delete(int id){

        using(var context = new Context()){

            var UsuarioAtivo = context.Usuario_Ativos.FirstOrDefault(x => x.Id == id);

            context.Remove(UsuarioAtivo);
            context.SaveChanges();

        }

    }

}