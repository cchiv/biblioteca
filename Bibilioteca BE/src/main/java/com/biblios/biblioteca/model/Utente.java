package com.biblios.biblioteca.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UTENTE_ID")
    private long id;

    @Column(unique = true)
    private String nome;
    private String cognome;
    private String residenza;

    @OneToMany(mappedBy = "utente")
    @JsonManagedReference /* evita il loop della relazione bidirezionale*/
    @OnDelete(action= OnDeleteAction.CASCADE)
    private List<Libro> libro;

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getResidenza() {
        return residenza;
    }
    public void setResidenza(String residenza) {
        this.residenza = residenza;
    }
    public String getCognome() {
        return cognome;
    }
    public void setCognome(String cognome) {
        this.cognome = cognome;
    }
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public List<Libro> getLibro() { return libro; }
    public void setLibro(List<Libro> libro) { this.libro = libro; }
}
