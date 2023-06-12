package com.jpatest.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jpatest.board.dto.BoardRequestDto;
import com.jpatest.board.dto.BoardResponseDto;
import com.jpatest.board.entity.Board;
import com.jpatest.board.entity.BoardRepository;
import com.jpatest.board.model.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardApiController {

    private final BoardService boardService;
    private final BoardRepository boardRepository;
    
    
    @GetMapping("hello")
    public List<String> hello() {
        return Arrays.asList("안녕하세요", "Hello");
    }
    //게시글 리스트
    @GetMapping("/boards")
    public List<BoardResponseDto> findAll() {
        return boardService.findAll();
    }
    //게시글 삭제
    @DeleteMapping("/boards/{id}")
    public String delete(@PathVariable final Long id) {
        boardService.delete(id);
        return "redirect:/api/boards";
    }
    //게시글 찾기
    @GetMapping("/board/{id}")
    ResponseEntity<?> getBoard(@PathVariable final Long id) {
    	System.out.println(id);
        Optional<Board> board = boardRepository.findById(id);
        return board.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    //게시글 생성
    @PostMapping("/board")
    ResponseEntity<Board> createGroup(@RequestBody Board board) throws URISyntaxException {
    	Board result = boardRepository.save(board);
        return ResponseEntity.created(new URI("/board" + result.getId()))
                .body(board);
    }
    //게시글 수정
    @PutMapping("/board")
    ResponseEntity<Board> updateGroup(@RequestBody Board board) {
        Board result = boardRepository.save(board);
        return ResponseEntity.ok().body(result);
    }
    
    
    /**
     * 게시글 생성
     
    @PostMapping("/board")
    public Long save(@RequestBody final BoardRequestDto params) {
        return boardService.save(params);
    }
    */
    
    /**
     * 게시글 수정
     
    @PutMapping("/board")
    public Long update(@RequestBody final Board board) {
    	return boardRepository.save(board);
    }
    */
}
