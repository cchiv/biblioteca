package com.biblios.biblioteca.mapper;

import com.biblios.biblioteca.DTO.utenteDTO;
import com.biblios.biblioteca.model.Utente;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface utenteMapper extends interfaceMapper<utenteDTO, Utente>{

}