import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonService } from './service/common.service';
import { ClipboardService } from 'ngx-clipboard';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  initial = '';
  subject = '';
  playingBgm = false;
  subjects: subject[] = [];
  private bgm: HTMLAudioElement = new Audio('assets/music/bgm.mp3');

  get theme() {
    return `「${this.initial}」から始まる${this.subject ? this.subject : '○○'}は？`
  }
  get targetCategories() {
    return this.subjects.filter(data => data.selected).map(data => data.category);
  }
  get categories() {
    return this.subjects.map(data => {
      data.category
    });
  }

  /**
   * コンストラクタ. ServiceSample1Component のインスタンスを生成する
   *
   * @param {CommonService} commonService 共通サービス
   * @memberof Sample1Component
   */
  constructor(private commonService: CommonService, private clipboardService: ClipboardService) { }

  ngOnInit(): void {
    console.log("ngOnInit");

    this.bgm.load();
    this.commonService.getSubjects().subscribe(data => {
      this.subjects = data.subjects;
    });
  }
  

  generateSubject() {
    console.log("generate subject");
    if(this.targetCategories.length === 0) {
      console.log("targetCategories.length = 0");
      return;
    }
    this.initial = this.commonService.getRandomInitial();
    this.subject = this.commonService.getRondomSubject(this.openArray(this.getSubjectsInCategory(this.targetCategories)));
  }

  copyTheme() {
    console.log("copy subject");
    this.clipboardService.copy(this.theme);
  }

  getSubjectsInCategory(categories: string[]): string[][] {
    return this.subjects.filter(data => categories.includes(data.category) ).map(data => data.subjects);
  }
  openArray(array: string[][]) {
    const ret = [];
    for (let arr of array) {
      ret.push(...arr);
    }
    return ret;
  }
  playSound() {
    this.bgm.play();
    this.playingBgm = true;
    this.bgm.onended = () => {
      this.playingBgm = false;
    };
  }
  pauseSound() {
    this.bgm.pause();
    this.playingBgm = false;
  }
  stopSound() {
    this.bgm.pause();
    this.bgm.currentTime = 0;
    this.playingBgm = false;
  }
  onClickPlayButton() {
    if (this.playingBgm) {
      this.pauseSound()
    } else {
      this.playSound();
    }
  }
}


type subject = {
  category: string;
  category_ja: string;
  selected: boolean;
  subjects: string[];
};