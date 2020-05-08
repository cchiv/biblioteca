package com.biblios.biblioteca.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface serviceInterface<DTO> {
    DTO save(DTO dto);
    Page<DTO> findAll(Pageable pageable);
    Optional<DTO> findOne(Long id);
    void delete(Long id);
}
