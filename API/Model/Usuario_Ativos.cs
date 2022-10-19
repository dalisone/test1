using System;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Usuario_Ativo {

    public Usuario Usuario{get; set;}
    public Ativos Ativo{get; set;}
    public decimal Saldo {get; set;}

}