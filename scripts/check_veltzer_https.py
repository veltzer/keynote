#!/usr/bin/python3

""" Check that no source file references veltzer.net over plain http.

Reproduces the Makefile's `check_veltzer_https` target (a repo-wide git grep):
every link to veltzer.net must use https. Files to check are passed as
command line arguments (rsconstruct's script processor batches them). """

import sys

# built by concatenation so this script does not flag itself
NEEDLE = "http:" + "//veltzer.net"


def main() -> None:
    """ main entry point """
    bad = []
    for filename in sys.argv[1:]:
        with open(filename, encoding="utf-8", errors="replace") as stream:
            for number, line in enumerate(stream, start=1):
                if NEEDLE in line:
                    bad.append(f"{filename}:{number}: {line.strip()}")
    if bad:
        print("\n".join(bad))
        print(f"error: found [{NEEDLE}] references; use https instead", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
