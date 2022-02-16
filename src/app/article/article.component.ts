import { Component, Input, OnInit } from '@angular/core';
import { Articles } from './article.constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles = Articles;

  constructor() { }

  ngOnInit() {
  }

}
