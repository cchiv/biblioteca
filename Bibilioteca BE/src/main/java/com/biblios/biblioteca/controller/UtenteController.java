package com.biblios.biblioteca.controller;

import com.biblios.biblioteca.DTO.libroDTO;
import com.biblios.biblioteca.DTO.utenteDTO;
import com.biblios.biblioteca.service.utenteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UtenteController {

    private final utenteService utenteService;

    public UtenteController(utenteService utenteService) {
        this.utenteService = utenteService;
    }

    @PostMapping("/insert")
    public ResponseEntity<utenteDTO> createUser(@Valid @RequestBody utenteDTO utenteDTO) {
        utenteDTO result = utenteService.save(utenteDTO);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<utenteDTO> updateUser(@Valid @RequestBody utenteDTO utenteDTO) {
        utenteDTO result = utenteService.save(utenteDTO);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<utenteDTO>> getAll(Pageable pageable) {
        Page<utenteDTO> result = utenteService.findAll(pageable);
        return new ResponseEntity<>(result.getContent(), HttpStatus.OK);
    }

    @GetMapping("/findByCognome/{cognome}")
    public ResponseEntity<List<utenteDTO>> getByCognome(@PathVariable String cognome) {
        List<utenteDTO> result = utenteService.findByCognome(cognome);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<utenteDTO> getUtente(@PathVariable long id) {
        Optional<utenteDTO> result = utenteService.findOne(id);
        return result.map(u -> ResponseEntity.ok().body(u)).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        utenteService.delete(id);
        return ResponseEntity.ok().build();
    }

}


