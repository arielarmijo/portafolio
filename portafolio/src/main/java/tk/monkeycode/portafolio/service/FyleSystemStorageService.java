package tk.monkeycode.portafolio.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.management.RuntimeErrorException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import tk.monkeycode.portafolio.exception.StorageFileNotFoundException;

@Slf4j
@Service
public class FyleSystemStorageService implements StorageService {
	
	private final Path root = Paths.get("/home/ubuntu/uploads/portafolio");

	@Override
	public void store(MultipartFile file) {
		if (file.isEmpty()) {
			throw new IllegalArgumentException(file.getOriginalFilename() + " is empty.");
		}
		try (InputStream inputStream = file.getInputStream()){
			Path destinationFile = root.resolve(Paths.get(file.getOriginalFilename()))
									   .normalize()
									   .toAbsolutePath();
			log.info("{}", destinationFile.toString() );
			Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			log.error("{}", e.getMessage());
			throw new StorageFileNotFoundException("Could not read file: ", e);
		}
	}

	@Override
	public Resource loadAsResource(String filename) {
		try {
			Path file = root.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			}
			else {
				throw new StorageFileNotFoundException("Could not read file: " + filename);
			}
		}
		catch (MalformedURLException e) {
			throw new StorageFileNotFoundException("Could not read file: " + filename, e);
		}
	}

}
