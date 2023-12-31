package com.jpatest.board;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.jpatest.board.entity.Board;
import com.jpatest.board.entity.BoardRepository;

@SpringBootTest
public class BoardTests {

    @Autowired
    BoardRepository boardRepository;

    @Test
    void save() {

        //게시글 생성
        Board params = Board.builder()
                .title("1번 테스트 제목")
                .content("1번 테스트 게시글 내용")
                .writer("글쓴이 1")
                .build();

        // 2. 게시글 저장
        boardRepository.save(params);

        //게시글 정보 조회
        Board entity = boardRepository.findById((long) 1).get();
        assertThat(entity.getTitle()).isEqualTo("1번 테스트 제목");
        assertThat(entity.getContent()).isEqualTo("1번 테스트 게시글 내용");
        assertThat(entity.getWriter()).isEqualTo("글쓴이 1");
    }

    @Test
    void findAll() {

        //전체 게시글 수 조회
        long boardsCount = boardRepository.count();

        //전체 게시글 리스트 조회
        List<Board> boards = boardRepository.findAll();
    }

    @Test
    void delete() {

        //게시글 조회
        Board entity = boardRepository.findById((long) 1).get();

        //게시글 삭제
        boardRepository.delete(entity);
    }

}

