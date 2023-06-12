package com.jpatest.board.model;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jpatest.board.dto.BoardRequestDto;
import com.jpatest.board.dto.BoardResponseDto;
import com.jpatest.board.entity.Board;
import com.jpatest.board.entity.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    /**
     * 게시글 생성
     */
    @Transactional
    public Long save(final BoardRequestDto params) {

        Board entity = boardRepository.save(params.toEntity());
        return entity.getId();
    }

    /**
     * 게시글 리스트 조회
     */
    public List<BoardResponseDto> findAll() {

        Sort sort = Sort.by(Direction.DESC, "id", "createdDate");
        List<Board> list = boardRepository.findAll(sort);
        return list.stream().map(BoardResponseDto::new).collect(Collectors.toList());
    }
    
    /**
     * 게시글 조회
     */
    @Transactional
    public BoardResponseDto findById(final Long id) {

        Board entity = boardRepository.findById(id).get();
        return new BoardResponseDto(entity);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public Long update(final Long id, final BoardRequestDto params) {

        Board entity = boardRepository.findById(id).get();
        entity.update(params.getTitle(), params.getContent(), params.getWriter());
        return id;
    }

    /**
     * 게시글 삭제
     */
    public Long delete(final Long id) {

        //게시글 조회
        Board entity = boardRepository.findById(id).get();
        boardRepository.delete(entity);
        return id;
    }
}