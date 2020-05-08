package com.biblios.biblioteca.DAO;

import com.biblios.biblioteca.model.Libro;
import com.biblios.biblioteca.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Long> {
    List<Utente> findByCognomeStartsWith(String cognome);
}
