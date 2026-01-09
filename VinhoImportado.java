public class VinhoImportado extends Vinho {
   private double taxaImportacao;
   
   public VinhoImportado(String nome, double preco, double taxa) {
    super(nome, preco);
    this.taxaImportacao = taxa;
}

@Override
public void exibirDetalhes() {
    double precoTotal = getPreco() + taxaImportacao;
    System.out.println("Vinho Importado: " + getNome() + " | Total com taxa: R$ " + precoTotal);
    }
    }