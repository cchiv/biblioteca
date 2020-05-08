package com.biblios.biblioteca.DTO;

import com.biblios.biblioteca.model.Libro;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class utenteDTO {

    private long id;
    private String nome;
    private String cognome;
    private String residenza;
    private List<Libro> libro;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getResidenza() {
        return residenza;
    }

    public void setResidenza(String residenza) {
        this.residenza = residenza;
    }

    public List<Libro> getLibro() { return libro; }

    public void setLibro(List<Libro> libro) { this.libro = libro; }

}
