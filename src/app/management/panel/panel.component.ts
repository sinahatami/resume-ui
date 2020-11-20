import { ToastrService } from 'ngx-toastr'
import { PanelService } from './panel.service'
import { HeaderRendererComponent } from './ag-grid/header-renderer/header-renderer.component'
import { ButtonRendererComponent } from './ag-grid/button-renderer/button-renderer.component'
import { Component, OnInit } from '@angular/core'
import { GridOptions } from 'ag-grid-community'
import { CheckboxRendererComponent } from './ag-grid/checkbox-renderer/chechbox-renderer.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  onTabChange(i) {}

  //--------------------------------------------------BLOG------------------------------------------------
  gridOptionsBlog = <GridOptions>{
    context: {
      thisComponent: this,
    },
    multiSortKey: 'multiSortKey',
    animateRows: true,
    sideBar: sideBar,
    floatingFilter: true,
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Title',
        field: 'title',
        filter: 'agTextColumnFilter',
        tooltipField: 'title',
      },
      {
        headerName: 'Status',
        field: 'status',
        cellRendererFramework: CheckboxRendererComponent,
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter',
        tooltipField: 'descripton',
      },
      {
        headerName: 'Create Date',
        field: 'publishDate',
        filter: 'agTextColumnFilter',
        tooltipField: 'publishDate',
      },
      {
        headerComponentParams: {
          onAddClick: this.addMethodBlog.bind(this),
          onExcellClick: this.excelBlog.bind(this),
        },
        headerName: 'actions',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          actions: [
            {
              onClick: this.editMethodBlog.bind(this),
              label: 'Edit',
            },
            {
              onClick: this.deleteMethodBlog.bind(this),
              label: 'Delete',
            },
            {
              onClick: this.viewMethodBlog.bind(this),
              label: 'View',
            },
          ],
        },
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    onGridSizeChanged: this.onGridSizeChanged.bind(this),
  }

  onGetBlog() {
    this.panelService.getAllBlog().subscribe((res: any) => this.gridOptionsBlog.api.setRowData(res))
  }

  formTypeBlog: string = ''
  showFormBlog: boolean = false
  addMethodBlog() {
    this.showFormBlog = false
    this.formTypeBlog = 'Add'
    setTimeout(() => (this.showFormBlog = true))
  }

  hideFormBlog() {
    this.showFormBlog = false
    this.formTypeBlog = ''
  }

  BlogID
  editMethodBlog(params) {
    this.showFormBlog = false
    this.BlogID = params.rowData._id
    this.formTypeBlog = 'Edit'
    setTimeout(() => (this.showFormBlog = true))
  }

  viewMethodBlog() {
    this.showFormBlog = true
    this.formTypeBlog = 'View'
  }

  rowGroupCallback(params) {
    return params.node.key
  }

  excelBlog() {
    this.gridOptionsBlog.api.exportDataAsExcel({ processRowGroupCallback: this.rowGroupCallback })
  }

  deleteMethodBlog(event) {
    Swal.fire({
      title: 'do You Want To Remove?',
      text: 'You cant reverce this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value)
        this.panelService.deleteDataBlog(event.rowData._id).subscribe((_) => {
          this.onGetBlog()
          this.toastrService.success('successful to delete post', 'success')
        })
    })
  }

  //--------------------------------------------------CONTACTS------------------------------------------------
  gridOptionsContact = <GridOptions>{
    context: {
      thisComponent: this,
    },
    multiSortKey: 'multiSortKey',
    animateRows: true,
    sideBar: sideBar,
    floatingFilter: true,
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Name',
        field: 'name',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Phone',
        field: 'phone',
        filter: 'agTextColumnFilter',
        tooltipField: 'phone',
      },
      {
        headerName: 'Email',
        field: 'email',
        filter: 'agTextColumnFilter',
        tooltipField: 'email',
      },
      {
        headerName: 'Subject',
        field: 'subject',
        filter: 'agTextColumnFilter',
        tooltipField: 'subject',
      },
      {
        headerName: 'Comment',
        field: 'comment',
        filter: 'agTextColumnFilter',
        tooltipField: 'comment',
      },
      {
        headerComponentParams: {
          disableAdd: true,
          onExcellClick: this.excelBlog.bind(this),
        },
        headerName: 'actions',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          actions: [
            {
              onClick: this.deleteMethodContact.bind(this),
              label: 'Delete',
            },
          ],
        },
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    onGridSizeChanged: this.onGridSizeChanged.bind(this),
  }

  onGetContact() {
    this.panelService.getAllContact().subscribe((res: any) => this.gridOptionsContact.api.setRowData(res))
  }

  deleteMethodContact(event) {
    Swal.fire({
      title: 'do You Want To Remove?',
      text: 'You cant reverce this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value)
        this.panelService.deleteDataContact(event.rowData._id).subscribe((_) => {
          this.toastrService.success('successful to delete post', 'success')
          this.onGetContact()
        })
    })
  }

  //--------------------------------------------------TIMELINE------------------------------------------------
  gridOptionsTimeline = <GridOptions>{
    context: {
      thisComponent: this,
    },
    multiSortKey: 'multiSortKey',
    animateRows: true,
    sideBar: sideBar,
    floatingFilter: true,
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Title',
        field: 'title',
        filter: 'agTextColumnFilter',
        tooltipField: 'title',
      },
      {
        headerName: 'Status',
        field: 'status',
        cellRendererFramework: CheckboxRendererComponent,
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter',
        tooltipField: 'descripton',
      },
      {
        headerName: 'Create Date',
        field: 'publishDate',
        filter: 'agTextColumnFilter',
        tooltipField: 'publishDate',
      },
      {
        headerComponentParams: {
          onAddClick: this.addMethodTimeline.bind(this),
          onExcellClick: this.excelTimeline.bind(this),
        },
        headerName: 'actions',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          actions: [
            {
              onClick: this.editMethodTimeline.bind(this),
              label: 'Edit',
            },
            {
              onClick: this.deleteMethodTimeline.bind(this),
              label: 'Delete',
            },
            {
              onClick: this.viewMethodTieline.bind(this),
              label: 'View',
            },
          ],
        },
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    onGridSizeChanged: this.onGridSizeChanged.bind(this),
  }

  onGetTimeline() {
    this.panelService.getAllTimeline().subscribe((res: any) => this.gridOptionsTimeline.api.setRowData(res))
  }

  formTypeTimeline: string = ''
  showFormTimeline: boolean = false
  showTimelineForm = false
  addMethodTimeline() {
    this.showTimelineForm = false
    this.formTypeBlog = 'Add'
    setTimeout(() => this.showTimelineForm = true)
  }

  hideFormTimeline() {}

  TimelineID
  editMethodTimeline(params) {
    this.showFormTimeline = false
    this.TimelineID = params.rowData._id
    this.formTypeTimeline = 'Edit'
    setTimeout(() => (this.showFormTimeline = true))
  }

  viewMethodTieline() {
    this.showFormTimeline = true
    this.formTypeTimeline = 'View'
  }

  excelTimeline() {
    this.gridOptionsTimeline.api.exportDataAsExcel({ processRowGroupCallback: this.rowGroupCallback })
  }

  deleteMethodTimeline(event) {
    Swal.fire({
      title: 'do You Want To Remove?',
      text: 'You cant reverce this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value)
        this.panelService.deleteDataTimeline(event.rowData._id).subscribe((_) => {
          this.onGetTimeline()
          this.toastrService.success('successful to delete post', 'success')
        })
    })
  }

  frameworkComponents: any
  constructor(private panelService: PanelService, private toastrService: ToastrService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      agColumnHeader: HeaderRendererComponent,
      checkboxComponent: CheckboxRendererComponent,
    }
  }

  ngOnInit(): void {
    this.onGetBlog()
    this.onGetContact()
    this.onGetTimeline()
  }

  onGridSizeChanged(event) {
    event?.api?.sizeColumnsToFit()
    event?.api?.setDomLayout('autoHeight')
  }
}

const defaultColDef = {
  enableRowGroup: true,
  enablePivot: true,
  enableValue: true,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: false,
  rowSelection: 'multiple',
  minWidth: 160,
  filterParams: { newRowsAction: 'keep' },
}

const sideBar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        suppressPivots: true,
        suppressPivotMode: true,
        suppressValues: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    },
  ],
  statusPanels: [
    {
      statusPanel: 'agAggregationComponent',
      statusPanelParams: {
        aggFuncs: ['min', 'max', 'avg'],
      },
    },
  ],
  position: 'left',
}
