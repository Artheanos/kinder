package pl.pjatk.kinder.repo;

import org.springframework.data.repository.CrudRepository;
import pl.pjatk.kinder.entity.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {
}
