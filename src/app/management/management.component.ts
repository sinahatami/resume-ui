import { ToastrService } from 'ngx-toastr'
import { Component, OnInit } from '@angular/core'
import { GridOptions } from 'ag-grid-community'
import Swal from 'sweetalert2'
import { ManagementService } from './management.service'
import { CheckboxRendererComponent } from '../common/ag-grid/checkbox-renderer/chechbox-renderer.component'
import { ButtonRendererComponent } from '../common/ag-grid/button-renderer/button-renderer.component'
import { HeaderRendererComponent } from '../common/ag-grid/header-renderer/header-renderer.component'

@Component({
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  onTabChange(event) {
    let tabIndex = event.index
    this.hideFormBlog()
    switch (tabIndex) {
      case 0:
        this.onGetBlog()
        break;
      case 1:
        this.onGetContact()
        break;
      case 2:
        this.onGetTimeline()
        break;
      case 3:
        this.onGetComment()
        break;
    }
  }

  //--------------------------------------------------BLOG------------------------------------------------
  gridOptionsBlog = <GridOptions>{
    context: {
      thisComponent: this,
    },
    multiSortKey: 'multiSortKey',
    animateRows: true,
    sideBar: sideBar,
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
        minWidth: 210,
        maxWidth: 240
      },
      {
        headerName: 'Title',
        field: 'title',
        filter: 'agTextColumnFilter',
        tooltipField: 'title',
        minWidth: 160,
        maxWidth: 190,
      },
      {
        headerName: 'Status',
        field: 'status',
        cellRendererFramework: CheckboxRendererComponent,
        width: 70,
        maxWidth: 110,
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter',
        tooltipField: 'descripton',
        minWidth: 170,
      },
      {
        headerName: 'Create Date',
        field: 'publishDate',
        filter: 'agTextColumnFilter',
        tooltipField: 'publishDate',
        minWidth: 120,
        maxWidth: 210,
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
        width: 100,
        maxWidth: 170,
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    onGridSizeChanged: this.onGridSizeChanged.bind(this),
  }

  onGetBlog() {
    this.hideFormBlog()
    this.managementService.getAllBlog().subscribe((res: any) => this.gridOptionsBlog.api.setRowData(res))
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
    this.BlogID = params.rowData._id
    this.formTypeBlog = 'Edit'
    this.showFormBlog = true
  }

  viewMethodBlog(params) {
    this.BlogID = params.rowData._id
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
        this.managementService.deleteDataBlog(event.rowData._id).subscribe((_) => {
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
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
        minWidth: 190,
        maxWidth: 240
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
        maxWidth: 210
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
        maxWidth: 250
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
    this.managementService.getAllContact().subscribe((res: any) => this.gridOptionsContact.api.setRowData(res))
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
        this.managementService.deleteDataContact(event.rowData._id).subscribe((_) => {
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
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
        maxWidth: 230
      },
      {
        headerName: 'Date',
        field: 'date',
        filter: 'agTextColumnFilter',
        tooltipField: 'year',
        maxWidth: 170
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter',
        tooltipField: 'descripton',
        minWidth: 170
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
        maxWidth: 150
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    onGridSizeChanged: this.onGridSizeChanged.bind(this),
  }

  onGetTimeline() {
    this.managementService.getAllTimeline().subscribe((res: any) => {
      this.gridOptionsTimeline.rowData = res
      this.gridOptionsTimeline.api.setRowData(res)
      if (res.length == 0) {
        this.gridOptionsTimeline.api.setRowData([])
        this.gridOptionsTimeline.rowData = []
      }
    })
  }

  formTypeTimeline: string = ''
  showFormTimeline: boolean = false
  showTimelineForm = false

  addMethodTimeline() {
    this.showFormTimeline = true
    this.formTypeTimeline = 'Add'
  }

  hideFormTimeline() {
    this.showFormTimeline = false
    this.formTypeTimeline = ''
  }

  TimelineID
  editMethodTimeline(params) {
    this.TimelineID = params.rowData._id
    this.formTypeTimeline = 'Edit'
    this.showFormTimeline = true
  }

  viewMethodTieline(params) {
    this.TimelineID = params.rowData._id
    this.formTypeTimeline = 'View'
    this.showFormTimeline = true
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
        this.managementService.deleteDataTimeline(event.rowData._id).subscribe((_) => {
          this.onGetTimeline()
          this.toastrService.success('successful to delete post', 'success')
        })
    })
  }

  //--------------------------------------------------COMMENT------------------------------------------------
  gridOptionsComment = <GridOptions>{
    context: {
      thisComponent: this,
    },
    multiSortKey: 'multiSortKey',
    animateRows: true,
    sideBar: sideBar,
    enableRangeSelection: true,
    pivotPanelShow: 'always',
    rowGroupPanelShow: 'always',
    defaultColDef: defaultColDef,
    columnDefs: [
      {
        headerName: 'ID',
        field: '_id',
        filter: 'agTextColumnFilter',
        minWidth: 240,
      },
      {
        headerName: 'Blog ID',
        field: 'blogId',
        filter: 'agTextColumnFilter',
        tooltipField: 'BlogID',
        minWidth: 240,
      },
      {
        headerName: 'Username',
        field: 'username',
        filter: 'agTextColumnFilter',
        tooltipField: 'username',
        minWidth: 140,
      },
      {
        headerName: 'Email',
        field: 'email',
        filter: 'agTextColumnFilter',
        tooltipField: 'email',
        minWidth: 180,
      },
      {
        headerName: 'Subject',
        field: 'subject',
        filter: 'agTextColumnFilter',
        tooltipField: 'subject',
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter',
        tooltipField: 'description',
      },
      {
        headerName: 'actions',
        headerComponentParams: { disableAdd: true, onExcellClick: this.excelTimeline.bind(this) },
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          actions: [
            {
              onClick: this.deleteMethodComment.bind(this),
              label: 'Delete',
            },
            {
              onClick: this.acceptRejectComment.bind(this, true),
              label: 'Accept',
            },
            {
              onClick: this.acceptRejectComment.bind(this, false),
              label: 'Reject',
            },
          ],
        },
      },
    ],
    rowClassRules: {
      isTrueStatus: function (params) {
        if (params.data == undefined) return
        if (params && params.data) return true
      },
      isFalseStatus: function (params) {
        if (params.data == undefined) return
        if (params && params.data && params.data.status === false) return true
      },
    },
    pagination: true,
    paginationPageSize: 10,
    onGridSizeChanged: this.onGridSizeChanged.bind(this),
  }

  onGetComment() {
    this.managementService.getComment().subscribe((res: any) => {
      res.forEach(element => {
        element.username = element.userId.username
        element.email = element.userId.email
      });
      this.gridOptionsComment.rowData = res
      this.gridOptionsComment.api.setRowData(res)
      if (res.length == 0) {
        this.gridOptionsComment.api.setRowData([])
        this.gridOptionsComment.rowData = []
      }
    })
  }

  acceptRejectComment(status, event) {
    Swal.fire({
      title: 'do You Want To do this?',
      text: 'You cant reverce this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) this.onPostComment(event.rowData._id, status)
    })
  }

  onPostComment(id, status) {
    this.managementService.acceptRejectComment(id, status).subscribe((_) => {
      this.toastrService.success('successful to accept comment', 'success')
      this.onGetComment()
    })
  }

  deleteMethodComment(event) {
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
        this.managementService.deleteMethodComment(event.rowData._id).subscribe((_) => {
          this.onGetComment()
          this.toastrService.success('successful to delete comment', 'success')
        })
    })
  }

  frameworkComponents: any
  constructor(private managementService: ManagementService, private toastrService: ToastrService) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
      agColumnHeader: HeaderRendererComponent,
      checkboxComponent: CheckboxRendererComponent,
    }
  }

  ngOnInit(): void {
    this.onGetBlog()
  }

  onGridSizeChanged(event) {
    event.api.sizeColumnsToFit()
    event.api.setDomLayout('autoHeight')
  }
}

const defaultColDef = {
  floatingFilter: true,
  enableRowGroup: true,
  enablePivot: true,
  enableValue: true,
  sortable: true,
  filter: true,
  resizable: true,
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
