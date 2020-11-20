import { Component, ViewChild, ElementRef } from '@angular/core'
import { faPlus, faFileExcel, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

@Component({
  templateUrl: './header-renderer.component.html',
  styleUrls: ['./header-renderer.component.scss'],
})
export class HeaderRendererComponent {
  faPlus = faPlus
  faFileExcel = faFileExcel
  faArrowUp = faArrowUp
  faArrowDown = faArrowDown

  public params: any

  hover: any
  ascSort: string
  descSort: string
  noSort: string
  showPlusIcon: boolean
  showCopyIcon: boolean
  showCutIcon: boolean

  @ViewChild('menuButton', { read: ElementRef, static: false }) public menuButton;

  onAddClick(item, $event) {
    if (item.onAddClick instanceof Function) {
      const params = {
        event: $event,
        rowData: [],
      }
      item.onAddClick(params)
    }
  }

  onExcellClick(item, $event) {
    if (item.onExcellClick instanceof Function) {
      const params = {
        event: $event,
        rowData: [],
      }
      item.onExcellClick(params)
    }
  }

  agInit(params): void {
    this.params = params
    params.column.addEventListener('sortChanged', this.onSortChanged.bind(this))
    this.onSortChanged()
    this.params.showPlusIcon != undefined ? (this.showPlusIcon = this.params.showPlusIcon) : (this.showPlusIcon = true)
    this.params.showCopyIcon != undefined ? (this.showCopyIcon = this.params.showCopyIcon) : (this.showCopyIcon = false)
    this.params.showCutIcon != undefined ? (this.showCutIcon = this.params.showCutIcon) : (this.showCutIcon = false)
  }

  onMenuClicked() {
    this.params.showColumnMenu(this.menuButton.nativeElement)
  }

  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive'
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active'
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active'
    } else {
      this.noSort = 'active'
    }
  }

  sort: string = ''
  _sortingUp: boolean = false
  _sortingDown: boolean = false
  _sorting: boolean = true
  onSortRequested(order, event) {
    if (order == '') {
      this._sortingUp = true
      this._sortingDown = false
      this._sorting = false
      order = 'asc'
      this.sort = 'asc'
    } else if (order == 'asc') {
      this._sortingUp = false
      this._sortingDown = true
      this._sorting = false
      order = 'desc'
      this.sort = 'desc'
    } else if (order == 'desc') {
      this._sortingUp = false
      this._sortingDown = false
      this._sorting = true
      order = ''
      this.sort = ''
    }
    this.params.setSort(order, event.shiftKey)
  }
}
