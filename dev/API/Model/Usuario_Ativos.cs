using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario_Ativo {

    public int Id {get; set;}
    public Usuario Usuario{get; set;}
    public Ativos Ativo{get; set;}
    public decimal Saldo {get; set;}

    public int Save(){

        int Id = 0;

        using(var context = new Context()){

            var usuario_ativo = new Usuario_Ativo(){

                var usuario = context.Usuario.Fir

            };

            context.Usuario.Add(Usuario);
            context.SaveChanges();
            Id = Usuario.Id;

        }
        return Id;

    }

}