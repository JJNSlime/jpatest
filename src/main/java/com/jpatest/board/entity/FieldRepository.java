package com.jpatest.board.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FieldRepository extends JpaRepository<Field, Long> {
    // 추가적인 메서드 정의 가능
}