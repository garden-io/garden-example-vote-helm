# Voting example project with Helm charts

This is a clone of the [vote example project](https://github.com/garden-io/garden/tree/master/examples/vote/README.md),
modified to use Helm charts to describe Kubernetes resources, instead of the simpler `container` module type.

You'll notice that we still use the `container` module types for building the container images (the corresponding
`*-image` next to each service module), but they do not contain a `service` section.

The `helm` modules only contain the charts, which reference the container images. Garden will build the images
ahead of deploying the charts.

Furthermore, to showcase the chart re-use feature, the `api` and `result` modules use the `base-chart` module
as a base.

For more details on how to use Helm charts, please refer to our
[Helm user guide](https://docs.garden.io/using-garden).

## Usage

Start by running `garden deploy` or `garden dev` in the project's top-level directory, to spin the stack up.

```sh
garden dev

Good evening! Let's get your environment wired up...

✔ providers                 → Getting status... → Ready
✔ api-image                 → Building api-image:v-e299662a59... → Done (took 6.9 sec)
✔ base-chart                → Building version v-6d2c8a69ee... → Done (took 0.3 sec)
✔ redis                     → Building version v-82123c1f27... → Done (took 2.3 sec)
✔ postgres                  → Building version v-11c3d20e92... → Done (took 2.1 sec)
✔ vote-image                → Building vote-image:v-82c2b9fb74... → Done (took 5.2 sec)
✔ postgres                  → Checking status... → Version v-11c3d20e92 already deployed
✔ redis                     → Checking status... → Version v-82123c1f27 already deployed
✔ result-image              → Building result-image:v-bb1d906b24... → Done (took 4.4 sec)
...
```

**Note:** If you're running _minikube_, you may need to add the appropriate entries to your `/etc/hosts` file.
Find the IP for your local cluster by running `minikube ip` and add an entry with that IP for each of
`vote.local.app.garden`, `result.local.app.garden` and `api.local.app.garden`.
This is not necessary when using Docker for Desktop, because your cluster will then be exposed directly on _localhost_.

### To Vote

The voting UI is at http://vote.local.app.garden/. Open a browser tab, and try voting a few times.

### View Results

In a separate tab, open http://result.local.app.garden. The results there will reflect in real-time your voting.

### Try out hot-reloading

Hot-reloading needs to be enabled per service when starting `garden deploy` or `garden dev`:

```sh
garden dev --hot=vote
# OR garden deploy --hot=vote
```

Then try making a change to one of the source files in the `vote-image` service, to see it synchronize into the
running container, instead of the normal build+deploy flow. Note that changing the file will _also_ trigger a
build and some tests, but the hot-reloading should complete almost instantly while those take longer to complete.
