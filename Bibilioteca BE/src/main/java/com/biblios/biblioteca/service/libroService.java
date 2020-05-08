package com.biblios.biblioteca.service;

import com.biblios.biblioteca.DAO.LibroRepository;
import com.biblios.biblioteca.DTO.libroDTO;
import com.biblios.biblioteca.mapper.libroMapper;
import com.biblios.biblioteca.model.Libro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class libroService implements serviceInterface<libroDTO> {

    private final LibroRepository libroRepository;
    private final libroMapper libroMapper;

    public libroService(LibroRepository libroRepository, libroMapper libroMapper){
        this.libroRepository = libroRepository;
        this.libroMapper = libroMapper;
    }

    @Override
    public libroDTO save(libroDTO libroDTO){
        Libro libro = libroMapper.toEntity(libroDTO);
        libro = libroRepository.save(libro);
        return libroMapper.toDTO(libro);
    };

    @Override
    public Page<libroDTO> findAll(Pageable pageable){
        return libroRepository.findAll(pageable).map(libroMapper::toDTO);
    };

    @Override
    public Optional<libroDTO> findOne(Long id){
        return libroRepository.findById(id).map(libroMapper::toDTO);
    };

    @Override
    public void delete(Long id){
        libroRepository.deleteById(id);
    };

    public List<libroDTO> findByTitle(String titolo) {
        return libroMapper.toDTOList(libroRepository.findByTitoloStartsWith(titolo));
    }

}
