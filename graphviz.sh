git log --graph --all --decorate --oneline
git log --graph --full-history --all --pretty=format:"%h%x09%d%x20%s"
git log --graph --full-history --all --color \
        --pretty=format:"%x1b[31m%h%x09%x1b[32m%d%x1b[0m%x20%s"
