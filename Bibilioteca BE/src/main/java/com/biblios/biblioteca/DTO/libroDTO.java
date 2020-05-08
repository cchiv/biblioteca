package com.biblios.biblioteca.DTO;

import com.biblios.biblioteca.model.Utente;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class libroDTO {

    private long id;
    private int ISBN;
    private String titolo;
    private String autore;
    private String editore;
    private String genere;
    private boolean disponibile;
    private Utente utente;

    public Date getInizioPrestito() {
        return inizioPrestito;
    }

    public void setInizioPrestito(Date inizioPrestito) {
        this.inizioPrestito = inizioPrestito;
    }

    private Date inizioPrestito;

    public int getISBN() {
        return ISBN;
    }

    public void setISBN(int ISBN) {
        this.ISBN = ISBN;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getAutore() {
        return autore;
    }

    public void setAutore(String autore) {
        this.autore = autore;
    }

    public String getEditore() {
        return editore;
    }

    public void setEditore(String editore) {
        this.editore = editore;
    }

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) { this.id = id; }

    public boolean isDisponibile() { return disponibile; }

    public void setDisponibile(boolean disponibile) { this.disponibile = disponibile; }

    public Utente getUtente() { return utente; }

    public void setUtente(Utente utente) { this.utente = utente; }
}
