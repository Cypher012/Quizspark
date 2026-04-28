MODULES_DIR=src/modules

feat:
	@if [ -z "$(mod)" ]; then \
		echo "Usage: make feat mod=module_name"; \
		exit 1; \
	fi

	@mkdir -p $(MODULES_DIR)/$(mod)

	@touch $(MODULES_DIR)/$(mod)/$(mod).routes.ts
	@touch $(MODULES_DIR)/$(mod)/$(mod).schema.ts
	@touch $(MODULES_DIR)/$(mod)/$(mod).service.ts
	@touch $(MODULES_DIR)/$(mod)/$(mod).repository.ts

	@echo "Module '$(mod)' created in $(MODULES_DIR)/$(mod)"
