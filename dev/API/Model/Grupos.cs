using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Grupos{

    public int Id {get; set;}
    public string Nome {get; set;}

    public int Save(){

        int Id = 0;

        using(var context = new Context()){

            var Usuario = new Usuario(){

                DataNasc = this.DataNasc,
                Nome = this.Nome,
                Tipo = this.Tipo,
                Login = this.Login,
                Senha = this.Senha

            };

            context.Usuario.Add(Usuario);
            context.SaveChanges();
            Id = Usuario.Id;

        }
        return Id;

    }

}