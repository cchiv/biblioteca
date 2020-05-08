package com.biblios.biblioteca.controller;

import com.biblios.biblioteca.DTO.libroDTO;
import com.biblios.biblioteca.model.Libro;
import com.biblios.biblioteca.service.libroService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {

    private final libroService libroService;

    public LibroController(libroService libroService) {
        this.libroService = libroService;
    }

    @PostMapping("/insert")
    public ResponseEntity<libroDTO> insertBook(@Valid @RequestBody libroDTO libroDTO) {
        libroDTO result = libroService.save(libroDTO);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<libroDTO> updateBook(@Valid @RequestBody libroDTO libroDTO) {
        libroDTO result = libroService.save(libroDTO);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<libroDTO>> getAll(Pageable pageable) {
        Page<libroDTO> result = libroService.findAll(pageable);
        return new ResponseEntity<>(result.getContent(), HttpStatus.OK);
    }

    @GetMapping("/findByTitolo/{titolo}")
    public ResponseEntity<List<libroDTO>> getByTitle(@PathVariable String titolo) {
        List<libroDTO> result = libroService.findByTitle(titolo);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<libroDTO> getById(@PathVariable long id ){
        Optional<libroDTO> result = libroService.findOne(id);
        return result.map(l -> ResponseEntity.ok().body(l)).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable long id) {
        libroService.delete(id);
        return ResponseEntity.ok().build();
    }
}
