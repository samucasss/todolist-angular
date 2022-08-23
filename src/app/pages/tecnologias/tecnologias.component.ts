import { Component, OnInit } from '@angular/core';
import { Tecnologia } from 'src/app/models/tecnologia';
import { TecnologiaService } from 'src/app/services/tecnologia.service';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.css']
})
export class TecnologiasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'tipo'];
  tecnologiaList: Tecnologia[] = []

  constructor(private tecnologiaService: TecnologiaService) {

  }

  ngOnInit(): void {
    this.tecnologiaService.findAll().subscribe(tecnologiaList => 
      this.tecnologiaList = tecnologiaList);
  }

}
