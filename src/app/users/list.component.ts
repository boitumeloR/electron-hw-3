import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService } from '@app/_services';
import { User } from '@app/_models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '@app/_components/modals/confirm/confirm.component';

@Component({ 
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.less'],
})
export class ListComponent implements OnInit {
    users!: User[];

    dataSource = new MatTableDataSource<User>();
    filter = '';
    displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(private userService: UserService, private snack: MatSnackBar,
                private router: Router, private route: ActivatedRoute,
                private dialog: MatDialog) {}

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.dataSource = new MatTableDataSource<User>(users);
                this.users = users;
            });
    }

    filterTable(filter: any): void{
        this.dataSource.filter = filter;
    }

    updateUser(user: User) {
        console.log(user);
        this.router.navigateByUrl('users/add');
    }

    deleteUser(inUser: User) {
        const conf = this.dialog.open(ConfirmComponent, {
            disableClose: true,
        });

        conf.afterClosed().subscribe(res => {
            if(res) {
                const user = this.users.find(x => x.id === inUser.id);
                if (!user) return;
                user.isDeleting = true;
                this.userService.delete(inUser.id)
                    .pipe(first())
                    .subscribe(() => {
                        this.users = this.users.filter(x => x.id !== inUser.id);
                        this.dataSource = new MatTableDataSource<User>(this.users.filter(x => x.id !== inUser.id));
                    });
            }
        })
    }
}