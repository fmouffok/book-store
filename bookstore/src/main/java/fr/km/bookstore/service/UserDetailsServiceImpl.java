package fr.km.bookstore.service;

import fr.km.bookstore.dao.UserRepository;
import fr.km.bookstore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {


    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final Optional<User> user = repository.findByUsername(username);
        user.orElseThrow(()-> new UsernameNotFoundException("No user found : "+ username));
        return user.map(UserDetailsImpl::new).get();
    }
}
