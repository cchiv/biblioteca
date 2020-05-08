package com.biblios.biblioteca.service;

import com.biblios.biblioteca.DAO.UtenteRepository;
import com.biblios.biblioteca.DTO.utenteDTO;
import com.biblios.biblioteca.mapper.utenteMapper;
import com.biblios.biblioteca.model.Utente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class utenteService implements serviceInterface<utenteDTO> {

    private final utenteMapper utenteMapper;
    private final UtenteRepository utenteReposiotry;

    public utenteService(utenteMapper userMapper, UtenteRepository userReposiotry){
        this.utenteMapper = userMapper;
        this.utenteReposiotry = userReposiotry;
    }

    @Override
    public utenteDTO save(utenteDTO utenteDTO){
        Utente utente = utenteMapper.toEntity(utenteDTO);
        utente = utenteReposiotry.save(utente);
        return utenteMapper.toDTO(utente);
    }

    @Override
    public Page<utenteDTO> findAll(Pageable pageable) {
        return utenteReposiotry.findAll(pageable).map(utenteMapper::toDTO);
    }

    @Override
    public Optional<utenteDTO> findOne(Long id){
        return utenteReposiotry.findById(id).map(utenteMapper::toDTO);
    }

    @Override
    public void delete(Long id) {
        utenteReposiotry.deleteById(id);
    }

    public List<utenteDTO> findByCognome (String cognome) {
        return utenteMapper.toDTOList(utenteReposiotry.findByCognomeStartsWith(cognome));
    }
}
