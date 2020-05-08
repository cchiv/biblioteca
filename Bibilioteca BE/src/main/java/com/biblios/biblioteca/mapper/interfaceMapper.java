package com.biblios.biblioteca.mapper;

import java.util.List;

public interface interfaceMapper <DTO, Entity> {
    Entity toEntity(DTO dto);
    DTO toDTO(Entity entity);
    List<Entity> toEntityList(Iterable<DTO> dtoList);
    List<DTO> toDTOList(Iterable<Entity> entityList);
}
