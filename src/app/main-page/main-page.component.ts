import { Component , OnInit , HostListener} from '@angular/core';
import { ImagePreloaderService } from '../services/image-preloader.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  activeSelection:string = 'about';
  currentPhotoType:string = 'about';
  currentPhotoDataId:number = 0;
  currentPhotoDataId_link:number[] = [0,0,0,0,0];
  currentPhotoUrl:string = '';
  currentPhotoUrl_link:string[] = ['assets/pic/mockup_ncare01.jpg'
                                  ,'assets/pic/mockup_botpy01.jpg'
                                  ,'assets/pic/mockup_card01.jpg'
                                  ,'assets/pic/mockup_game01.jpg'
                                  ,''];
  currentPhotoDescription:string = '';
  currentPhotoDescription_link:string[] = ['nCare Chat App','Telegram Bot Message','Greeting Card Preview','Game Title Screen',''];
  photoData:any[]=[ { type:'project1',
                      data: [ {url:'assets/pic/mockup_ncare01.jpg',description:'nCare Chat App'},
                              {url:'assets/pic/mockup_ncare02.jpg',description:'nCare Chat Website Form Login'},
                              {url:'assets/pic/mockup_ncare03.jpg',description:'nCare Chat Website Main'},
                              {url:'assets/pic/mockup_ncare04.jpg',description:'nCare Chat Mobile'},
                            ]
                    },
                    { type:'project2',
                      data: [ {url:'assets/pic/mockup_botpy01.jpg',description:'Telegram Bot Message'},
                              {url:'assets/pic/mockup_botpy02.jpg',description:'Telegram Bot Data Input Html'},
                              {url:'assets/pic/mockup_botpy03.jpg',description:'Telegram Bot Data Output Csv'},
                              {url:'assets/pic/mockup_botpy04.jpg',description:'Telegram Bot Data Input Open in Notepad'},
                              {url:'assets/pic/mockup_botpy05.jpg',description:'Telegram Bot Data Output Open in Notepad'},
                            ]
                    },
                    { type:'project3',
                      data: [ {url:'assets/pic/mockup_card01.jpg',description:'Greeting Card Preview'},
                              {url:'assets/pic/mockup_card02.jpg',description:'Greeting Card Dialog'},
                            ]
                    },
                    { type:'project4',
                      data: [ {url:'assets/pic/mockup_game01.jpg',description:'Game Title Screen'},
                              {url:'assets/pic/mockup_game02.jpg',description:'Game Dialog'},
                              {url:'assets/pic/mockup_game03.jpg',description:'Game Tutorial'},
                              {url:'assets/pic/mockup_game04.jpg',description:'Game Puzzle Mode'},
                            ]
                    },
                   
  ];
  isPhoneMode = false;

  constructor(private imagePreloader: ImagePreloaderService) {
    const imageUrls = [ 'assets/pic/mockup_ncare01.jpg', 
                        'assets/pic/mockup_ncare02.jpg', 
                        'assets/pic/mockup_ncare03.jpg', 
                        'assets/pic/mockup_ncare04.jpg', 
                        'assets/pic/mockup_botpy01.jpg',
                        'assets/pic/mockup_botpy02.jpg',
                        'assets/pic/mockup_botpy03.jpg',
                        'assets/pic/mockup_botpy04.jpg',
                        'assets/pic/mockup_botpy05.jpg',
                        'assets/pic/mockup_card01.jpg',
                        'assets/pic/mockup_card02.jpg',
                        'assets/pic/mockup_game01.jpg',
                        'assets/pic/mockup_game02.jpg',
                        'assets/pic/mockup_game03.jpg',
                        'assets/pic/mockup_game04.jpg'
                        ];
    this.imagePreloader.preloadImages(imageUrls);
    
  }
  ngOnInit() {
    this.updateIsPhoneMode();
    console.log('link_0')
    console.log(this.currentPhotoUrl_link[0])
    
  }

  @HostListener('window:resize')
  onResize() {
    this.updateIsPhoneMode();
  }

  private updateIsPhoneMode() {
    this.isPhoneMode = window.innerWidth <= 767;
  }

  checkIsPhoneMode(): boolean {
    return this.isPhoneMode;
  } 

  previousImage(){
    const maxId = this.getLengthIndex_currentPhotoDataId()
    if (this.currentPhotoDataId <= 0)
    { this.currentPhotoDataId = maxId - 1
    }
    else
    { this.currentPhotoDataId -= 1;
    }
    this.update_url_description_photo();
  }
  
  previousImage_link(noLink:number){
    const maxId = this.getLengthIndex_currentPhotoDataId_link(noLink)
    if (this.currentPhotoDataId_link[noLink] <= 0)
    { this.currentPhotoDataId_link[noLink] = maxId - 1
    }
    else
    { this.currentPhotoDataId_link[noLink] -= 1;
    }
    this.update_url_description_photo_link(noLink);
  }

  nextImage(){
    const maxId = this.getLengthIndex_currentPhotoDataId()
    if (this.currentPhotoDataId >= maxId - 1)
    { this.currentPhotoDataId = 0
    }
    else
    { this.currentPhotoDataId += 1;
    }
    this.update_url_description_photo();
  }

  nextImage_link(noLink:number){
    const maxId = this.getLengthIndex_currentPhotoDataId_link(noLink)
    if (this.currentPhotoDataId_link[noLink] >= maxId - 1)
    { this.currentPhotoDataId_link[noLink] = 0
    }
    else
    { this.currentPhotoDataId_link[noLink] += 1;
    }
    this.update_url_description_photo_link(noLink);
  }

  updateActiveSelection(updated:string){
   
      if (this.activeSelection != updated)
        { this.activeSelection = updated
          if (updated != 'about'){
              this.changingActiveSelection() 
          }
        }
    
    
  }

  updateActiveOnHover(updated:string){
    if (this.activeSelection != updated)
      { this.activeSelection = updated
        if (updated != 'about'){
            this.changingActiveSelection() 
        }
      }
  }

  changingActiveSelection(){
    if (this.currentPhotoType != this.activeSelection)
      {   this.currentPhotoType = this.activeSelection
          this.currentPhotoDataId = 0
          this.update_url_description_photo()
      }
  }

  update_url_description_photo(){
    const projectNow = this.photoData.find(project => project.type === this.currentPhotoType);
    if ( projectNow.data.length == 0 )
    { this.currentPhotoUrl = ''
      this.currentPhotoDescription = ''
    }
    else {
      this.currentPhotoUrl = projectNow.data[this.currentPhotoDataId].url
      this.currentPhotoDescription = projectNow.data[this.currentPhotoDataId].description
    }
  }

  update_url_description_photo_link(noLink:number){
    const projectNow = this.photoData[noLink];
    if ( projectNow.data.length == 0 )
    { this.currentPhotoUrl_link[noLink] = '';
      this.currentPhotoDescription_link[noLink] = '';
    }
    else {
      this.currentPhotoUrl_link[noLink] = projectNow.data[this.currentPhotoDataId_link[noLink]].url;
      this.currentPhotoDescription_link[noLink] = projectNow.data[this.currentPhotoDataId_link[noLink]].description;
    }
  }

  getLengthIndex_currentPhotoDataId():number{
    const projectNow = this.photoData.find(project => project.type === this.currentPhotoType);
    return projectNow.data.length
  }

  getLengthIndex_currentPhotoDataId_link(noLink:number):number{
    const projectNow = this.photoData[noLink];
    return projectNow.data.length;
  }
}
