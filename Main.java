public class Main {
    public static void main(String[] args) {
        // Criando um vinho nacional
        Vinho nacional = new Vinho("Tinto Reserva",  89.90);

        // Criando um vinho importado
        VinhoImportado importado = new VinhoImportado("Malbec Argentino", 120.00, 45.00);

        // Executando
        System.out.println("--- LISTA DE PRODUTOS ---");
        nacional.exibirDetalhes();
        importado.exibirDetalhes(); // Polimorfismo: o Java sabe qual método usar!
    }
}
