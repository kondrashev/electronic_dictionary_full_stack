package net.ukr.kondrashev.entities;

public enum UserRole {
    ADMIN, USER;

    @Override
    public String toString() {
        return "ROLE_" + name();
    }
}
