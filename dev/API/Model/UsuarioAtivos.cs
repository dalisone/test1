using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario_Ativo {

    public int Id {get; set;}
    public Usuario Usuario{get; set;}
    public Ativos Ativo{get; set;}
    public decimal Saldo {get; set;}

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


    public static List<object> FindAll(){

        using(var context = new Context()){

            var usuarioAtivo = context.Usuario_Ativos.Include(x => x.Ativo).Include(x => x.Usuario);

            List<object> usuarioAtivos = new List<object>();

            foreach (var item in usuarioAtivo){
                usuarioAtivos.Add(item);
            }

            return usuarioAtivos;

        }

    }

}