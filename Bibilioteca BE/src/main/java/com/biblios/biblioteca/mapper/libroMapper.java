package com.biblios.biblioteca.mapper;

import com.biblios.biblioteca.DTO.libroDTO;
import com.biblios.biblioteca.model.Libro;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface libroMapper extends interfaceMapper<libroDTO, Libro>{

}
