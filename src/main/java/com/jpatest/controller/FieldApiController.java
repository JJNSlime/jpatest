package com.jpatest.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jpatest.board.entity.Board;
import com.jpatest.board.entity.Field;
import com.jpatest.board.entity.FieldRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/report")
public class FieldApiController {
	
    private FieldRepository FieldRepository;

	@Autowired
    public FieldApiController(FieldRepository FieldRepository) {
        this.FieldRepository = FieldRepository;
    }
    
    @GetMapping
    public List<Field> getAllFields() {
        return FieldRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @PostMapping
    public Field createField(@RequestBody Field field) {
        return FieldRepository.save(field);
    }
    
    @DeleteMapping("/{id}")
    public void deleteField(@PathVariable Long id) {
      FieldRepository.deleteById(id);
    }
    
    @Transactional
    @PutMapping("/{fieldId}")
    public ResponseEntity<Field> updateField(@PathVariable("fieldId") Long fieldId, @RequestBody Field updatedField) {
    	System.out.println(fieldId);
    	Field result = FieldRepository.save(updatedField);
    	return ResponseEntity.ok().body(result);
    }
}
