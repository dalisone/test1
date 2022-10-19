using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario
{
    
    public int Id {get; set;}

    public DateTime DataNasc {get; set;}
    public string Nome{get; set;}
    public int Tipo{get; set;}
    public string Login {get; set;}
    public string Senha {get; set;}


    public int Save(){

        int Id = 0;

        using(var context = new Context()){

            var usuario = new Usuario(){

                DataNasc = this.DataNasc,
                Nome = this.Nome,
                Tipo = this.Tipo,
                Login = this.Login,
                Senha = this.Senha

            };

            context.Usuario.Add(usuario);
            context.SaveChanges();
            Id = usuario.Id;

        }
        return Id;

    }

}