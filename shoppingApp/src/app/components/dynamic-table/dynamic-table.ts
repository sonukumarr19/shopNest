import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-dynamic-table',
  imports: [CommonModule ],
  templateUrl: './dynamic-table.html',
  styleUrls: ['./dynamic-table.css']
})
export class DynamicTable {

  @Input() title: string = '';
  @Input() tableHeadings: string[] = [];
  @Input() tableData: any[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  paginatedData: any[] = [];

  ngOnInit() {
    this.updatePageSize();
    this.updatePaginatedData();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updatePageSize();
    this.updatePaginatedData();
  }

  updatePageSize() {
    const width = window.innerWidth;
    if (width < 640) this.pageSize = 3;
    else if (width < 768) this.pageSize = 5;
    else if (width < 1024) this.pageSize = 7;
    else this.pageSize = 10;
  }

  updatePaginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.tableData.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.tableData.length) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.tableData.length / this.pageSize);
  }
}

