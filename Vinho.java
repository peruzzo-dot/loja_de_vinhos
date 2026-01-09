public class Vinho {
    private String nome;
    private double preco;

    // Construtor: usado para criar o vinho com nome e preço
    public Vinho(String nome, double preco) {
        this.nome = nome;
        this.preco = preco;
}

// Método para exibir os dados (Comportamento)
public void exibirDetalhes() {
    System.out.println("Vinho: "+ nome +" | Valor: R$ " + preco);
}
public String getNome() { return nome; }
public double getPreco() { return preco; }
}