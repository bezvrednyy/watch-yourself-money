alter table transaction
    drop constraint transaction_id_bank_account_fkey,
    drop constraint transaction_id_category_fkey;

alter table transaction
    add foreign key (id_bank_account) references bank_account
        on update cascade on delete cascade,
    add foreign key (id_category) references category
        on update cascade on delete cascade;


alter table user_settings
    drop constraint user_settings_id_user_settings_fkey;

alter table user_settings
    add foreign key (id_user_settings) references "user"
        on update cascade on delete cascade;


alter table category
    drop constraint category_id_user_fkey,
    drop constraint category_id_parent_category_fkey;

alter table category
    add foreign key (id_user) references "user"
        on update cascade on delete cascade,
    add foreign key (id_parent_category) references category
        on update cascade on delete cascade;


alter table bank_account
    drop constraint bank_account_id_user_fkey;

alter table bank_account
    add foreign key (id_user) references "user"
        on update cascade on delete cascade;
